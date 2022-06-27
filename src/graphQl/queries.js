import { gql } from '@apollo/client';

export const CATEGORIES = gql`
query {
    categories {
      name
    }
  }
`
export const CURRENCIES = gql`
query {
	currencies {
    label
    symbol
  }
}
`
export const PRODUCTS = gql`
query ($category: String!) {
  category(input: {title: $category}) {
    name
    products {
      name
      id
      description
      gallery
      inStock
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency{
          label
        }
        amount
      }
    }
  }
}
`

export const SINGLE_PRODUCT = gql`
query ($productId: String!) {
  product(id: $productId) {
    name
    gallery
    id
    inStock
    description
    brand
  attributes {
    id
    name
    type
    items {
      displayValue
      value
      id
    }
  }
    prices {
      currency{
        label
      }
      amount
    }
  }
}
`