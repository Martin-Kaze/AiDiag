export default function Home() {
  return (
    <div className="clinical-grid bg-base-100">
      
      {/* The Sidebar (Nav area) */}
      <nav className="area-nav bg-base-200 border-r border-base-300 p-4">
        <h2 className="font-bold text-primary mb-4">Menu</h2>
        <ul>
          <li className="p-2 hover:bg-base-300 rounded">Dashboard</li>
          <li className="p-2 hover:bg-base-300 rounded">Patients</li>
        </ul>
      </nav>

      {/* The Header (Head area) */}
      <header className="area-head bg-white p-6 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Medical Portal</h1>
        <button className="btn btn-primary btn-sm">Sign Out</button>
      </header>

      {/* The Main Content (Body area) */}
      <main className="area-body p-8">
        <div className="card bg-white shadow-xl p-6">
          <h2 className="text-secondary text-xl">Main Content Area</h2>
          <p className="mt-2">Your data will go here.</p>
        </div>
      </main>

    </div>
  );
}