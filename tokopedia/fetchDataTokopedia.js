import axios from 'axios'

const fetchDataTokopedia = async (product) => {
    const result = []
    const data = await axios.post('https://gql.tokopedia.com/', [{
        "operationName": "SearchProduct", "variables": { "q": product, "start": 0, "rows": 10, "uniqueId": "6bb61e3b7bce0931da574d19d1d82c88", "filter": {}, "ob": "23" }, "query": "query SearchProduct($q: String, $start: Int, $rows: Int, $ob: Int, $uniqueId: String, $filter: SearchProductFilterInput)" + `{  searchProduct(q: $q, start: $start, rows: $rows, ob: $ob, filter: $filter, uniqueId: $uniqueId) {
        query
        source
        shareUrl
        isFilter
        count
        redirection {
          redirectUrl
          departmentId
          __typename
        }
        suggestion {
          currentKeyword
          suggestion
          suggestionCount
          instead
          insteadCount
          text
          query
          __typename
        }
        products {
          id
          name
          childs
          url
          imageUrl
          imageUrlLarge
          price
          rating
          countReview
          preorder
          cashback
          wishlist
          gaKey
          catId
          shop {
            id
            name
            url
            location
            city
            reputation
            clover
            goldmerchant
            official
            __typename
          }
          __typename
        }
        catalogs {
          id
          name
          price
          rawPrice
          minPrice
          maxPrice
          rawMinPrice
          rawMaxPrice
          count
          description
          imageUrl
          url
          departmentId
          __typename
        }
        __typename
      }
    }`}])

    for(var a=0;a<data.data[0].data.searchProduct.products.length;a++){
        result.push({
            product_name:data.data[0].data.searchProduct.products[a].name,
            imageUrl:data.data[0].data.searchProduct.products[a].imageUrl,
            product_url:data.data[0].data.searchProduct.products[a].imageUrlLarge.url,
            price:parseInt(data.data[0].data.searchProduct.products[a].price.substring(3).replace(/\./g,'')),
            source:{
                source_id:1,
                source_name:'tokopedia'
            }
        })
    }
    return await result

}

export default fetchDataTokopedia