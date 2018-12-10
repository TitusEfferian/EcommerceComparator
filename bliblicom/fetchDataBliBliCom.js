import axios from 'axios'
import cheerio from 'cheerio'

const fetchDataBliBliCom = async (search) => {
    const data = []
    const result = await axios.get('https://www.blibli.com/jual/'+search)
    await cheerio('.product-detail-wrapper', result.data).each(function () {
        data.push({ 
            product_name: cheerio(this).find('.product-title').text().trim(),
            price:parseInt(cheerio(this).find('.new-price-text').text().trim().substring(3).replace(/,/g,'')),
            imageUrl:cheerio(this).find('a > .product-detail > .product-preview > .product-block > .product-image > .img-lazy-container').children('.lazy').attr('data-original').toString(),
            source:{
                source_id:4,
                source_name:'blibli.com'
            }
         })
    })
    return data
}

export default fetchDataBliBliCom
