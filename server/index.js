import e from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {Client} from "pg";
import dotenv from "dotenv";
dotenv.config();

const port = 5000;
const app = e();

app.use(bodyParser.json());
app.use(cors());

const db = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

//get all of the notes
app.get("/api/notes", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM notes ORDER BY id DESC");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//post new note
app.post("/api/notes", async (req,res)=>{
    const {title, content} = req.body;
    const result = await db.query("INSERT INTO notes (title,content) VALUES ($1,$2) RETURNING *", [title, content]);
    res.json(result.rows[0]);
});

//delete note
app.delete("/api/notes/:id", async (req, res)=>{
    const id = req.params.id;
    await db.query("DELETE FROM notes WHERE id=$1", [id]);
    res.sendStatus(204);
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})