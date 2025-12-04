// /src/components/PageHeader.jsx
import habitoLogo from '../assets/habito-app-logo.png';

function PageHeader({ title }) {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center gap-4">
      <img src={habitoLogo} alt="Habito Logo" className="w-8 h-8" />
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
    </header>
  );
}

export default PageHeader;