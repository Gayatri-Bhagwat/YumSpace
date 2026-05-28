

export const initialShoppingData = {
    "Dairy and Eggs": [],
    "Meat": [],
    "Pantry": [],
    "Vegetables": []
}

export const RecipeCardData = [
    // {
    //     "id":1,
    //     "title": "Delicious Pizza",
    //     "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=95",
    //     "time_minutes": 55,
    //     "servings": 3,
    //     "description": "Crispy homemade pizza topped with fresh vegetables, melted cheese, and aromatic herbs. Perfect for family gatherings or casual dinners with customizable toppings.",
    //     "likes": 120,
    //     "tag":[{"name":"Italian"},{"name":"Veggies"}],
    //     "ingredient": [{"name":"flour"}, {"name":"water"}, {"name":"yeast"},
    //         {"name":"sugar"}, {"name":"salt"}, {"name":"olive oil"}],
    //     "recipe_procedure": [
    //         {
    //             "step": 1,
    //             "title": "Knidding",
    //             "text": "Take 500gm of flour and knid it by adding water, sugar and salt.",
    //             "timer": 10
    //         },
    //         {
    //             "step": 2,
    //             "title": "Cutting",
    //             "text": "Cut the necessary vegies and arrange them in the plate.",
    //             "timer": 15
    //         },
    //         {
    //             "step": 3,
    //             "title": "Baking",
    //             "text": "Spread dough, spread vegies, add cheese and olive oil. ",
    //             "timer": 30
    //         }
    //     ]
    // },
    // {
    //     "id":2,
    //     "title": "Spaghetti Carbonara",
    //     "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1920&q=95",
    //     "time_minutes": 45,
    //     "servings": 4,
    //     "description": "Classic Italian spaghetti carbonara featuring creamy egg sauce, crispy pancetta, and Parmesan cheese. Ready in under 45 minutes for authentic comfort food.",
    //     "likes": 200,
    //     "tag":[{"name":"Italian"},{"name":"LowCarbs"}],
    //     "ingredients": [{"name":"spaghetti"}, {"name":"pancetta"}, {"name":"eggs"}, 
    //         {"name":"Parmesan cheese"},{"name":"garlic"}, {"name":"Salt and black pepper to taste"}],
    //     "recipe_procedure": [
    //         {
    //             "step": 1,
    //             "title": "Boiling",
    //             "text": "Boil the pasta in water by adding few drops of oil in water",
    //             "timer": 10
    //         },
    //         {
    //             "step": 2,
    //             "title": "Cutting",
    //             "text": "Cut the necessary vegies and arrange them in the plate.",
    //             "timer": 15
    //         },
    //         {
    //             "step": 3,
    //             "title": "Saute",
    //             "text": "Hot some oil in pan, add veggies, cheese and boiled pasta. Spread some olive oil and sizzelings.",
    //             "timer": 20
    //         }
    //     ]
    // },
    // {
    //     "id":3,
    //     "title": "Chicken Curry",
    //     "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1920&q=95",
    //     "time_minutes": 60,
    //     "servings": 5,
    //     "description": "Rich and flavorful chicken curry cooked in coconut milk with authentic Indian spices. Tender chicken pieces simmered to perfection for a hearty dinner.",
    //     "likes": 350,
    //     "tag":[{"name":"NonVeg"},{"name":"Dinner"},{"name":"Spicy"}],
    //     "ingredients": [{"name":"chicken breast"}, {"name":"vegetable oil"}, {"name":"onion"},
    //         {"name":"garlic"},{"name":"ginger"}, {"name":"coconut milk"}, {"name":"Salt"}, {"name":"Paper"}],
    //     "recipe_procedure": [
    //         {
    //             "step": 1,
    //             "title": "Prepare Marinade",
    //             "text": "Cut chicken into pieces, mix with yogurt, ginger-garlic paste, turmeric, chili powder, salt. Marinate for 30 mins.",
    //             "timer": 10
    //         },
    //         {
    //             "step": 2,
    //             "title": "Saute Base",
    //             "text": "Heat oil, add chopped onions, saute till golden. Add ginger-garlic, tomatoes, spices (cumin, coriander, garam masala). Cook till oil separates.",
    //             "timer": 15
    //         },
    //         {
    //             "step": 3,
    //             "title": "Add Chicken",
    //             "text": "Add marinated chicken, stir-fry 5 mins. Pour coconut milk/water, simmer covered 20-25 mins till tender.",
    //             "timer": 25
    //         },
    //         {
    //             "step": 4,
    //             "title": "Finish",
    //             "text": "Adjust salt, garnish with coriander. Serve hot.",
    //             "timer": 10
    //         }
    //     ]
    // },
    // {
    //     "id":4,
    //     "title": "Vegetable Stir Fry",
    //     "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1920&q=95",
    //     "time_minutes": 25,
    //     "servings": 2,
    //     "description": "Quick and healthy vegetable stir fry with crisp bell peppers, broccoli, and carrots tossed in savory soy sauce. Ready in 25 minutes for a nutritious meal.",
    //     "likes": 150,
    //     "tag":[{"name":"Healthy"},{"name":"QuickMeals"}],
    //     "ingredients": [{"name":"vegetable oil"}, {"name":"garlic"}, {"name":"bell peppers"}, {"name":"broccoli florets"}, {"name":"carrot"},
    //         {"name":"soy sauce"}, {"name":"Salt and pepper"}],
    //     "recipe_procedure": [
    //         {
    //             "step": 1,
    //             "title": "Prep Veggies",
    //             "text": "Slice bell peppers, carrots thinly. Cut broccoli into florets. Mince garlic.",
    //             "timer": 5
    //         },
    //         {
    //             "step": 2,
    //             "title": "Stir Fry",
    //             "text": "Heat oil in wok, add garlic, stir 30 secs. Add carrots, broccoli, peppers. Stir-fry on high heat 5-7 mins till crisp-tender.",
    //             "timer": 10
    //         },
    //         {
    //             "step": 3,
    //             "title": "Season",
    //             "text": "Add soy sauce, salt, pepper. Toss 1 min. Serve immediately.",
    //             "timer": 10
    //         }
    //     ]
    // },
    // {
    //     "id":5,
    //     "title": "Chocolate Cake",
    //     "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1920&q=95",
    //     "time_minutes": 90,
    //     "servings": 8,
    //     "description": "Decadent moist chocolate cake layered with creamy frosting. Perfect indulgence for birthdays or any celebration, serves 8 generously.",
    //     "likes": 500,
    //     "tag":[{"name":"Sweet"},{"name":"Bakery"},{"name":"Chocolaty"}],
    //     "ingredients": [{"name":"flour"}, {"name":"sugar"}, {"name":"cocoa powder"}, {"name":"baking powder"}, {"name":"baking soda"}, {"name":"salt"},
    //         {"name":"eggs"}, {"name":"milk"}, {"name":"vegetable oil"}, {"name":"vanilla extract"},
    //         {"name":"boiling water"}],
    //     "recipe_procedure": [
    //         {
    //             "step": 1,
    //             "title": "Mix Dry Ingredients",
    //             "text": "Whisk flour, sugar, cocoa, baking powder/soda, salt in bowl.",
    //             "timer": 5
    //         },
    //         {
    //             "step": 2,
    //             "title": "Mix Wet Ingredients",
    //             "text": "Add eggs, milk, oil, vanilla to dry. Beat till smooth. Stir in boiling water (batter thin).",
    //             "timer": 10
    //         },
    //         {
    //             "step": 3,
    //             "title": "Bake",
    //             "text": "Pour into greased pans. Bake at 350F/175C for 30-35 mins. Cool.",
    //             "timer": 40
    //         },
    //         {
    //             "step": 4,
    //             "title": "Frosting",
    //             "text": "Beat butter, cocoa, powdered sugar, milk, vanilla till spreadable.",
    //             "timer": 15
    //         },
    //         {
    //             "step": 5,
    //             "title": "Assemble",
    //             "text": "Level cakes, frost layers and top. Decorate.",
    //             "timer": 20
    //         }
    //     ]
    // },
    // {
    //     "id":6,
    //     "title": "Grilled Salmon",
    //     "image": "https://images.unsplash.com/photo-1676300185165-3f543c1fcb72?&auto=format&fit=crop&w=1920&q=95",
    //     "time_minutes": 25,
    //     "servings": 4,
    //     "description": "Perfectly grilled salmon fillets seasoned with lemon, garlic, and herbs. Healthy omega-3 rich dinner ready in under 30 minutes.",
    //     "likes":280,
    //     "tag":[{"name":"Seafood"}, {"name":"Healthy"}, {"name":"Dinner"}],
    //     "ingredients": [{"name":"salmon fillets"}, {"name":"olive oil"}, {"name":"lemon juice"}, {"name":"garlic"}, {"name":"fresh dill"}, {"name":"salt"}, {"name":"pepper"}],
    //     "recipe_procedure": [
    //         {
    //             "step": 1,
    //             "title": "Marinate",
    //             "text": "Mix olive oil, lemon juice, minced garlic, dill, salt, pepper. Coat salmon and marinate 10 mins.",
    //             "timer": 10
    //         },
    //         {
    //             "step": 2,
    //             "title": "Grill",
    //             "text": "Preheat grill to medium-high. Grill salmon skin-side down 4-5 mins, flip, grill 3-4 mins until 145°F internal.",
    //             "timer": 10
    //         },
    //         {
    //             "step": 3,
    //             "title": "Serve",
    //             "text": "Rest 2 mins, garnish with lemon wedges and dill. Serve with veggies or rice.",
    //             "timer": 5
    //         }
    //     ]
    // },
    // {
    //     "id":7,
    //     "title": "Apple Pie",
    //     "image": "https://plus.unsplash.com/premium_photo-1694336203192-c9e7f2891b95?auto=format&fit=crop&w=1920&q=95",
    //     "time_minutes": 75,
    //     "servings": 8,
    //     "description": "Classic homemade apple pie with flaky crust and cinnamon-spiced filling. Perfect fall dessert for holidays.",
    //     "likes": 650,
    //     "tag":[{"name":"Dessert"}, {"name":"American"}, {"name":"Baking"}],
    //     "ingredients": [{"name":"pie crust"}, {"name":"apples"}, {"name":"sugar"}, {"name":"cinnamon"}, {"name":"butter"}, {"name":"flour"}, {"name":"lemon juice"}],
    //     "recipe_procedure": [
    //         {
    //             "step": 1,
    //             "title": "Prep Filling",
    //             "text": "Peel, slice apples. Toss with sugar, cinnamon, flour, lemon juice.",
    //             "timer": 20
    //         },
    //         {
    //             "step": 2,
    //             "title": "Assemble Pie",
    //             "text": "Line pie dish with crust, add filling, dot butter, top crust, vent, crimp edges.",
    //             "timer": 15
    //         },
    //         {
    //             "step": 3,
    //             "title": "Bake",
    //             "text": "Bake 425°F 15 mins, reduce 350°F 40-50 mins until golden.",
    //             "timer": 40
    //         }
    //     ]
    // },
    // {
    //     "id":8,
    //     "title": "Beef Tacos",
    //     "image": "https://plus.unsplash.com/premium_photo-1664391890333-b6708e34b021?auto=format&fit=crop&q=60&w=1920",
    //     "time_minutes": 20,
    //     "servings": 6,
    //     "description": "Juicy seasoned ground beef tacos with fresh toppings in crispy shells. Quick weeknight dinner everyone loves.",
    //     "likes": 420,
    //     "tag":[{"name":"Mexican"}, {"name":"Quick"}, {"name":"Family"}],
    //     "ingredients": [{"name":"ground beef"}, {"name":"taco seasoning"}, {"name":"tortillas"}, {"name":"lettuce"}, {"name":"tomato"}, {"name":"cheese"}, {"name":"salsa"}],
    //     "recipe_procedure": [
    //         {
    //             "step": 1,
    //             "title": "Cook Beef",
    //             "text": "Brown ground beef in skillet, drain fat. Add taco seasoning and water, simmer 5 mins.",
    //             "timer": 10
    //         },
    //         {
    //             "step": 2,
    //             "title": "Prep Toppings",
    //             "text": "Chop lettuce, tomato. Shred cheese. Warm tortillas.",
    //             "timer": 5
    //         },
    //         {
    //             "step": 3,
    //             "title": "Assemble",
    //             "text": "Fill tortillas with beef and toppings. Serve with salsa.",
    //             "timer": 5
    //         }
    //     ]
    // },
    // {
    //     "id":9,
    //     "title": "Pad Thai",
    //     "image": "https://images.unsplash.com/photo-1637806930600-37fa8892069d?auto=format&fit=crop&w=1920&q=95",
    //     "time_minutes": 30,
    //     "servings": 4,
    //     "description": "Classic Thai stir-fried rice noodles with shrimp, eggs, bean sprouts, and peanuts in tangy tamarind sauce.",
    //     "likes": 380,
    //     "tag":[{"name":"Thai"}, {"name":"Noodles"}, {"name":"Asian"}],
    //     "ingredients": [{"name":"rice noodles"}, {"name":"shrimp"}, {"name":"eggs"}, {"name":"bean sprouts"}, {"name":"tofu"}, {"name":"peanuts"}, {"name":"tamarind paste"}, {"name":"fish sauce"}],
    //     "recipe_procedure": [
    //         {
    //             "step": 1,
    //             "title": "Soak Noodles",
    //             "text": "Soak rice noodles in warm water 10 mins until soft. Drain.",
    //             "timer": 10
    //         },
    //         {
    //             "step": 2,
    //             "title": "Make Sauce",
    //             "text": "Mix tamarind paste, fish sauce, sugar, chili paste.",
    //             "timer": 5
    //         },
    //         {
    //             "step": 3,
    //             "title": "Stir Fry",
    //             "text": "Cook shrimp, remove. Scramble eggs. Add noodles, sauce, sprouts, tofu, shrimp. Garnish with peanuts, lime.",
    //             "timer": 15
    //         }
    //     ]
    // }
    
]
