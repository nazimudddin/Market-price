"use client";

import { useState } from "react";
import { useSession, authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";

export default function ProfilePage() {
const { data: session, isPending } = useSession();
const [name, setName] = useState("");
const [loading, setLoading] = useState(false);

if (isPending) return <p>Loading...</p>;

if (!session) return <p>Please sign in first.</p>;

const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();

if (!name.trim()) {
  toast.error("Please enter your name");
  return;
}

setLoading(true);

try {
  const { error } = await authClient.updateUser({
    name: name.trim(),
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("Name updated successfully!");
  setName("");
} catch {
  toast.error("Something went wrong!");
} finally {
  setLoading(false);
}


};

return ( <div className="mx-auto mt-10 max-w-md rounded-xl border p-6 shadow-md"> <h1 className="mb-5 text-2xl font-bold">Profile Information</h1>


  <div className="mb-6 rounded-lg bg-gray-100 p-4">
    <p>
      <strong>Name:</strong> {session.user.name}
    </p>
    <p>
      <strong>Email:</strong> {session.user.email}
    </p>
  </div>

  <form onSubmit={handleUpdate} className="space-y-4">
    <input
      type="text"
      placeholder="Enter new name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full rounded-lg border p-3"
      required
    />

    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-lg bg-green-700 p-3 text-white disabled:opacity-50"
    >
      {loading ? "Updating..." : "Update Name"}
    </button>
  </form>
</div>


);
}
