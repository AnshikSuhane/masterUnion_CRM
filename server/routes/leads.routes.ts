import express from "express";
import { createLead, getLeads } from "../controllers/leads.controller";
import verifyClerk from "../middleware/verifyClerk";
const leadroutes = express.Router();

leadroutes.get("/", verifyClerk,getLeads);
leadroutes.post("/", verifyClerk, createLead);

export default leadroutes;
