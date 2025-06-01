import React, { useState, useEffect } from 'react';
import './App.css';
import UsageCharts from './UsageCharts';
import UsageByCategoryPie from './UsageByCategoryPie';

const categories = ['Cooking', 'Cleaning', 'Gardening', 'Drinking', 'Other'];

const carouselSlides = [
  {
    title: 'Water Conservation in Johannesburg',
    text: 'Johannesburg frequently faces water restrictions. Setting a water budget helps households contribute to saving municipal resources.',
  },
  {
    title: 'Fix Leaks Promptly',
    text: 'A dripping tap can waste up to 20 liters a day. Regularly check your plumbing to conserve water.',
  },
  {
    title: 'Water-Efficient Appliances',
    text: 'Use low-flow showerheads and water-efficient washing machines to reduce your usage drastically.',
  },
  {
    title: 'Gardening Tips',
    text: 'Water your garden early morning or late afternoon to reduce evaporation. Use mulch to retain moisture in soil.',
  },
  {
    title: 'Re-use Greywater',
    text: 'Use water from your washing machine or bath for flushing toilets or watering the garden.'
  }
];

function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [budget, setBudget] = useState(() => parseInt(localStorage.getItem('budget')) || 0);
  const [inputBudget, setInputBudget] = useState('');
  const [usageLog, setUsageLog] = useState(() => JSON.parse(localStorage.getItem('usageLog')) || []);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('budget', budget);
    localStorage.setItem('usageLog', JSON.stringify(usageLog));
  }, [budget, usageLog]);

  const handleSetBudget = () => {
    const parsed = parseInt(inputBudget);
    if (!parsed || parsed <= 0) return alert("Enter a valid budget");
    setBudget(parsed);
    setInputBudget('');
  };

  const addUsage = () => {
    const usage = parseInt(amount);
    if (!date || !usage || usage <= 0 || !category) {
      return alert("Please fill all fields correctly");
    }

    const totalUsed = usageLog.reduce((sum, entry) => sum + entry.usage, 0);
    if (usage > (budget - totalUsed)) {
      return alert("Usage exceeds remaining budget!");
    }

    if (new Date(date) > new Date()) {
      return alert("Date cannot be in the future.");
    }

    setUsageLog([...usageLog, { date, usage, category }]);
    setDate('');
    setAmount('');
    setCategory('');
  };

  const totalUsed = usageLog.reduce((sum, entry) => sum + entry.usage, 0);
  const remaining = Math.max(budget - totalUsed, 0);
  const percent = budget > 0 ? Math.round((totalUsed / budget) * 100) : 0;

  return (
    <div className="split-screen">
      <div className="left-panel">
        <img src="/METSIWISE.png" alt="METSI WISE" className="top-logo" />
        <div className="logo">
          <h1>Metsi<span className="highlight">Wise</span></h1>
        </div>

        <div className="welcome-text">
          <h2>{carouselSlides[slideIndex].title}</h2>
          <p>{carouselSlides[slideIndex].text}</p>
        </div>

        <div className="carousel-controls">
          {carouselSlides.map((_, i) => (
            <span
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`dot ${i === slideIndex ? 'active' : ''}`}
            ></span>
          ))}
        </div>

        <footer className="left-footer">
          <p>© 2025 MetsiWise</p>
          <p className="footer-tagline">Empowering South Africans to save every drop.</p>
          <p>info@metsiwise.co.za</p>
        </footer>
      </div>

      <div className="right-panel">
        <h1 className="dashboard-heading">Dashboard</h1>

        <div className="card">
          <h2>Set Monthly Budget</h2>
          <input
            type="number"
            placeholder="e.g. 6000 Litres"
            value={inputBudget}
            onChange={(e) => setInputBudget(e.target.value)}
          />
          <button onClick={handleSetBudget}>Set Budget</button>
        </div>

        <div className="card">
          <h2>Enter Daily Usage</h2>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input
            type="number"
            placeholder="Litres used"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">-- Select Category --</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
          <button onClick={addUsage}>Add Usage</button>
        </div>

        <div className="card">
          <h2>Summary</h2>
          <p><strong>Budget:</strong> {budget} L</p>
          <p><strong>Total Used:</strong> {totalUsed} L</p>
          <p><strong>Remaining:</strong> {remaining} L</p>
          <p><strong>Used:</strong> {percent}%</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percent}%` }}></div>
          </div>
          {percent >= 80 && (
            <div className="warning">⚠️ You're close to your monthly budget!</div>
          )}
          <h3 style={{ marginTop: '1em' }}>Usage Chart</h3>
             <UsageCharts data={usageLog} />
        </div>
        <div className="card">
          <UsageByCategoryPie usageLog={usageLog} categories={categories} />
        </div>

        <div className="card">
          <h2>Usage Log</h2>
          <ul>
            {usageLog.map((entry, index) => (
              <li key={index}>
                {entry.date}: {entry.usage} L ({entry.category})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App;