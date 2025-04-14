import React from "react";
import { Link } from "react-router-dom";
import "../styles/category.css"; 

const categories = [
    { name: "Music", path: "/category/Music" },
    { name: "Sports", path: "/category/Sports" },
    { name: "Theater", path: "/category/Theater" },
    { name: "Conference", path: "/category/Conference" },
    { name: "Others", path: "/category/Others" }
];

const CategoryList = () => {
    return (
        <div className="category-container">
            <div className="category-list">
                {categories.map((category) => (
                    <Link key={category.name} to={category.path} className="category-item">
                        <span>{category.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
