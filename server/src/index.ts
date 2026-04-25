import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Category CRUD ---

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { foods: true } } }
    });
    res.json(categories);
  } catch (error) {
    console.error('Categories Error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get single category
app.get('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id },
      include: { foods: true }
    });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Create category
app.post('/api/categories', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update category
app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await prisma.category.update({
      where: { id },
      data: { name }
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete category
app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// --- Food CRUD ---

// Get all foods (with filter and pagination)
app.get('/api/foods', async (req, res) => {
  try {
    const { categoryId, page = '1', limit = '6' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where = categoryId ? { categoryId: categoryId as string } : {};

    const [foods, total] = await Promise.all([
      prisma.food.findMany({
        where,
        skip,
        take: limitNum,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.food.count({ where }),
    ]);

    res.json({
      foods,
      pagination: {
        total,
        pages: Math.ceil(total / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error('Foods Error:', error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
});

// Get single food
app.get('/api/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const food = await prisma.food.findUnique({
      where: { id },
      include: { category: true }
    });
    if (!food) return res.status(404).json({ error: 'Food not found' });
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food item' });
  }
});

// Create food
app.post('/api/foods', async (req, res) => {
  try {
    const { name, description, price, imageUrl, categoryId } = req.body;
    const food = await prisma.food.create({
      data: { name, description, price, imageUrl, categoryId },
      include: { category: true }
    });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create food item' });
  }
});

// Update food
app.put('/api/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, categoryId } = req.body;
    const food = await prisma.food.update({
      where: { id },
      data: { name, description, price, imageUrl, categoryId },
      include: { category: true }
    });
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update food item' });
  }
});

// Delete food
app.delete('/api/foods/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.food.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food item' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
