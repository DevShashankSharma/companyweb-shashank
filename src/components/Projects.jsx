import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newProjects = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      file,
    }));
    setProjects(prev => [...prev, ...newProjects]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload and showcase your projects. Supported file types: images, PDFs, docs, and more.
          </p>
        </motion.div>
        <div className="flex justify-center mb-8">
          <button
            onClick={handleUploadClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Upload Project
          </button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No projects uploaded yet.</div>
          ) : (
            projects.map((project, idx) => (
              <motion.div
                key={project.name + idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
              >
                <div className="mb-4 w-full flex justify-center">
                  {project.type.startsWith('image/') ? (
                    <img src={project.url} alt={project.name} className="h-32 object-contain rounded" />
                  ) : (
                    <div className="h-32 flex items-center justify-center w-full bg-gray-100 rounded">
                      <span className="text-4xl">📄</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center break-all">{project.name}</h3>
                <p className="text-gray-500 text-xs mb-1">{(project.size / 1024).toFixed(2)} KB</p>
                <a
                  href={project.url}
                  download={project.name}
                  className="mt-2 inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 text-sm font-medium"
                >
                  Download
                </a>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects; 