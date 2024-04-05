import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { getAllCategories } from "../../services/categoryService";
import ProductCard from "../../components/product/ProductCard";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories(1, 10);
      setCategories(res.data.items);
    };
    fetchCategories();
  }, []);

  return (
    <section style= {{width:'88%'}}>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          {categories.map((category) => (
            <Tab key={category.id}>{category.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {categories.map((category) => (
            <TabPanel key={category.id} display='flex' gap='10px' flexWrap='wrap'>
              {category.products.length === 0 ? (<p style={{color:'red'}}>No products found.</p>) :
              (category.products.sort((a, b) => b.id - a.id).slice(0, 10).map((product) => (
                <ProductCard key={product.id} img={`${process.env.REACT_APP_API_BASE_URL}${product.imageUrl}`} title={product.name} price={product.price}/>
              )))}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </section>
  );
}

export default Home;
