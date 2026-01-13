const MetadataEditor = ({ title, description, tags, featuredImage, status, onChange }) => {
  const handleTagAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        onChange('tags', [...tags, newTag]);
      }
      e.target.value = '';
    }
  };

  const handleTagRemove = (tagToRemove) => {
    onChange('tags', tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="obsidian-card p-6 rounded-xl border border-[#30363d] space-y-4">
      <h3 className="text-lg font-bold text-white mb-4">Metadata</h3>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Enter note title..."
          className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Enter note description..."
          rows={3}
          className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Featured Image URL
        </label>
        <input
          type="text"
          value={featuredImage}
          onChange={(e) => onChange('featuredImage', e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tags
        </label>
        <input
          type="text"
          onKeyDown={handleTagAdd}
          placeholder="Type and press Enter to add tags..."
          className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-lg border border-primary/30 flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => handleTagRemove(tag)}
                  className="hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => onChange('status', e.target.value)}
          className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
    </div>
  );
};

export default MetadataEditor;
