import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// -------- CLIENTES --------
app.get("/clientes", async (req, res) => {
  const { data, error } = await supabase.from("clientes").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

// -------- PLANES --------
app.get("/planes", async (req, res) => {
  const { data, error } = await supabase.from("planes").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

// Servidor
app.listen(3001, () => {
  console.log("API Wisphub corriendo en http://localhost:3001");
});
