// /src/components/PageHeader.jsx

function PageHeader({ title }) {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
    </header>
  );
}

export default PageHeader;