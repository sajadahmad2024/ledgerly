'use client';

import React, { useState } from 'react';
import { Tag, Plus, Loader2, Trash2 } from 'lucide-react';
import { useCategories } from '@/features/categories/use-categories';

export default function CategoriesPage() {
  const {
    categories,
    isLoading,
    createCategory,
    isCreating,
    deleteCategory,
  } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [color, setColor] = useState('#EF4444');

  const handleCreate = async () => {
    if (!name) return;
    await createCategory({ name, type, color });
    setIsModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Categories
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            System defaults and custom categories for tagging expenses and income
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-sm text-zinc-500">
          Loading categories...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative rounded-2xl border border-zinc-800/80 bg-[#18181B]/60 p-5 backdrop-blur-xl transition-all hover:border-zinc-700/80 hover:bg-[#18181B]"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700/50"
                  style={{
                    backgroundColor: `${cat.color || '#3F3F46'}20`,
                    color: cat.color || '#F4F4F5',
                  }}
                >
                  <Tag className="h-4 w-4" />
                </div>

                {!cat.isDefault && (
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="rounded-lg p-1.5 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{cat.name}</h3>
                  {cat.isDefault && (
                    <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-400">
                      System
                    </span>
                  )}
                </div>
                <span
                  className={`mt-2 inline-block text-xs font-semibold ${
                    cat.type === 'INCOME' ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {cat.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#18181B] p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create Custom Category</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Crypto Trading"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 px-3 text-sm text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Category Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2 px-3 text-sm text-white outline-none focus:border-emerald-500"
                >
                  <option value="EXPENSE">EXPENSE</option>
                  <option value="INCOME">INCOME</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                  Color (Hex)
                </label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900 p-1 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-400 hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!name || isCreating}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-black hover:bg-emerald-400 disabled:opacity-50 cursor-pointer"
              >
                {isCreating && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
