import { Request, Response } from "express";
import { prisma } from "../config/db.ts";

export const getLeads = async (_req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({ include: { owner: true }, orderBy: { createdAt: "desc" } });
    res.json(leads);
  } catch (err) {
    console.error("getLeads error:", err);
    res.status(500).json({ message: "Error fetching leads" });
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, notes, ownerClerkId } = req.body;
    if (!name || !email || !ownerClerkId) return res.status(400).json({ message: "Missing fields" });
    let owner = await prisma.user.findUnique({ where: { clerkId: ownerClerkId } });
    if (!owner) {
      owner = await prisma.user.create({
        data: { clerkId: ownerClerkId, email: req.body.ownerEmail ?? `${ownerClerkId}@unknown`, role: "SALES" }
      });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        notes,
        ownerId: owner.id
      }
    });
    res.status(201).json(lead);
  } catch (err) {
    console.error("createLead error:", err);
    res.status(500).json({ message: "Error creating lead" });
  }
};
