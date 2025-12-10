import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

/* =====================================================
   1. CLIENTES
===================================================== */

// Obtener clientes
app.get("/clientes", async (req, res) => {
  const { data, error } = await supabase.from("clientes").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

// Crear cliente
app.post("/clientes", async (req, res) => {
  const { data, error } = await supabase.from("clientes").insert(req.body).select();
  if (error) return res.status(400).json(error);
  res.json(data);
});

// Actualizar cliente
app.put("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("clientes")
    .update(req.body)
    .eq("id", id)
    .select();
  if (error) return res.status(400).json(error);
  res.json(data);
});

// Eliminar cliente
app.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("clientes").delete().eq("id", id);
  if (error) return res.status(400).json(error);
  res.json({ message: "Cliente eliminado" });
});


/* =====================================================
   2. PLANES
===================================================== */

app.get("/planes", async (req, res) => {
  const { data, error } = await supabase.from("planes").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});


/* =====================================================
   3. PAGOS
===================================================== */

app.get("/pagos", async (req, res) => {
  const { data, error } = await supabase.from("pagos").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.post("/pagos", async (req, res) => {
  const { data, error } = await supabase.from("pagos").insert(req.body).select();
  if (error) return res.status(400).json(error);
  res.json(data);
});


/* =====================================================
   4. FACTURAS
===================================================== */

app.get("/facturas", async (req, res) => {
  const { data, error } = await supabase.from("facturas").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.post("/facturas", async (req, res) => {
  const { data, error } = await supabase.from("facturas").insert(req.body).select();
  if (error) return res.status(400).json(error);
  res.json(data);
});


/* =====================================================
   5. HISTORIAL DE CORTES
===================================================== */

app.post("/cortes", async (req, res) => {
  const { data, error } = await supabase.from("cortes").insert(req.body).select();
  if (error) return res.status(400).json(error);
  res.json(data);
});


/* =====================================================
   6. TICKETS DE SOPORTE
===================================================== */

app.get("/tickets", async (req, res) => {
  const { data, error } = await supabase.from("tickets").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.post("/tickets", async (req, res) => {
  const { data, error } = await supabase.from("tickets").insert(req.body).select();
  if (error) return res.status(400).json(error);
  res.json(data);
});


/* =====================================================
   7. LOGIN DE USUARIOS
===================================================== */

app.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("correo", correo)
    .eq("contrasena", contrasena)
    .single();

  if (error || !data)
    return res.status(401).json({ message: "Credenciales incorrectas" });

  res.json({ message: "Acceso permitido", user: data });
});


/* =====================================================
   Servidor dinámico para Railway
===================================================== */

app.listen(process.env.PORT || 8080, () => {
  console.log("API WispHub corriendo...");
});
