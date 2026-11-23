"use client";

import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function CrudPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function fetchNotes() {
    setLoading(true);
    try {
      const res = await fetch("/api/notes", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setNotes(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Gagal menambah data");
      return;
    }
    setTitle("");
    setContent("");
    setMessage("Data berhasil ditambahkan (Create).");
    await fetchNotes();
  }

  function startEdit(note: Note) {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setMessage("");
  }

  async function handleUpdate(id: number) {
    setMessage("");
    const res = await fetch(`/api/notes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Gagal mengubah data");
      return;
    }
    setEditingId(null);
    setMessage("Data berhasil diperbarui (Update).");
    await fetchNotes();
  }

  async function handleDelete(id: number) {
    setMessage("");
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Gagal menghapus data");
      return;
    }
    setMessage("Data berhasil dihapus (Delete).");
    await fetchNotes();
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Latihan CRUD (SQLite + Prisma)</h1>

      {message && (
        <div className="p-3 rounded border text-sm bg-gray-50">{message}</div>
      )}

      <form onSubmit={handleCreate} className="p-4 border rounded space-y-3">
        <h2 className="font-semibold">Tambah Data (Create)</h2>
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Isi catatan..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
          rows={3}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-black text-white text-sm"
        >
          Simpan Data
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="font-semibold">Daftar Data (Read / Review)</h2>
        {loading ? (
          <p className="text-sm">Memuat data...</p>
        ) : notes.length === 0 ? (
          <p className="text-sm">Belum ada data.</p>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="p-4 border rounded space-y-2">
                {editingId === note.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border p-2 rounded"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdate(note.id)}
                        className="px-3 py-1 rounded bg-black text-white text-sm"
                      >
                        Simpan Perubahan
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 rounded border text-sm"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold">{note.title}</h3>
                    <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => startEdit(note)}
                        className="px-3 py-1 rounded border text-sm"
                      >
                        Edit (Update)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        className="px-3 py-1 rounded border text-sm text-red-600"
                      >
                        Hapus (Delete)
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}