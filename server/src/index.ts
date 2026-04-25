import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Categories Route
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error('Categories Error:', error);
    res.status(500).json({ error: 'Failed to fetch categories', details: error instanceof Error ? error.message : String(error) });
  }
});

// Foods Route with Pagination and Filtering
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
    res.status(500).json({ error: 'Failed to fetch foods', details: error instanceof Error ? error.message : String(error) });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
