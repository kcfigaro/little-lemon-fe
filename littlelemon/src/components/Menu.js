import React from 'react';
import './Menu.css';

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      name: 'Greek Salad',
      description: 'Fresh mixed greens, tomatoes, cucumbers, olives, and feta cheese with our house dressing',
      price: 12.99,
      category: 'Starters',
      image: '🥗'
    },
    {
      id: 2,
      name: 'Grilled Sea Bass',
      description: 'Fresh sea bass grilled to perfection with lemon, herbs, and seasonal vegetables',
      price: 28.99,
      category: 'Main Course',
      image: '🐟'
    },
    {
      id: 3,
      name: 'Lamb Kebab',
      description: 'Tender lamb marinated in Mediterranean spices, served with rice and grilled vegetables',
      price: 24.99,
      category: 'Main Course',
      image: '🍖'
    },
    {
      id: 4,
      name: 'Baklava',
      description: 'Traditional Greek dessert with layers of phyllo dough, nuts, and honey syrup',
      price: 8.99,
      category: 'Desserts',
      image: '🍯'
    },
    {
      id: 5,
      name: 'Hummus & Pita',
      description: 'Creamy chickpea hummus served with warm pita bread and olive oil',
      price: 9.99,
      category: 'Starters',
      image: '🫓'
    },
    {
      id: 6,
      name: 'Mediterranean Pasta',
      description: 'Al dente pasta with sun-dried tomatoes, olives, capers, and fresh basil',
      price: 18.99,
      category: 'Main Course',
      image: '🍝'
    }
  ];

  const categories = ['All', 'Starters', 'Main Course', 'Desserts'];

  return (
    <section id="menu" className="menu">
      <div className="menu-container">
        <h2 className="section-title">Our Menu</h2>
        <p className="section-subtitle">Discover our signature Mediterranean dishes</p>

        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-image">
                <span className="menu-emoji">{item.image}</span>
              </div>
              <div className="menu-item-content">
                <div className="menu-item-header">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <span className="menu-item-price">${item.price}</span>
                </div>
                <p className="menu-item-description">{item.description}</p>
                <span className="menu-item-category">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="menu-cta">
          <a href="#booking" className="btn btn-primary">
            Book a Table to Enjoy
          </a>
        </div>
      </div>
    </section>
  );
};

export default Menu;
