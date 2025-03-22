export const getData = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Failed to Fetch data");
    }
    const data = await response.json();
    const final = data.products;
    if (final) {
      return final;
    } else {
      return [final];
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      props: { data: null, err: err },
    };
  }
};
 
export const getSingle = async (id: string) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to Fetch data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      props: { data: null, err: err },
    };
  }
}

