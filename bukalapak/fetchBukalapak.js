import axios from 'axios'

const fetchBukalapakData = async (product) => {
    const data = []
    const result = await axios.get('https://api.bukalapak.com/v2/products.json?keywords=' + product + '&page=1&top_seller=1&per_page=30')
    if (result.data.products.length != 0) {
        for (var a = 0; a < result.data.products.length; a++) {
            data.push({
                product_name: result.data.products[a].name,
                imageUrl: result.data.products[a].images[0],
                product_url: result.data.products[a].url,
                price: result.data.products[a].price,
                source: {
                    source_id: 3,
                    source_name: 'Bukalapak'
                }

            })
        }
    }

    return data
}

export default fetchBukalapakData