![Tests](https://github.com/brsong22/dumplingx3/actions/workflows/tests.yml/badge.svg)

# Dumplingx3
dumpling dumpling dumpling - it's like a personal camel camel camel for your groceries

#### Objective:
provide a web application that allows users to record grocery item prices and look them up to easily see price movement of items and easily determine whether there is a good deal relative to past prices.

#### Tech:
- TypeScript
- React
- Next.js
- Neon Postgresql + Prisma ORM
- Vercel hosting
- Jest test suite

#### Features:
- Barcode scanner - allows users to easily find items by scanning the barcode. Uses OpenFoodFacts api to search by UPC code
- UPC search - allows users to manually enter a UPC code to search if they do not wish to scan a barcode or if a barcode is not scannable for whatever reason.
- Item form - manual item entry to allow users the ability to enter item information manually. Handy if there are non-standard items or if an item cannot be found by UPC code.
  - features item name suggestions to quickly select previously saved items and auto populate form while also creating new price and location records for the item without duplicating the item
  - features store name suggestions to quickly select a previously shopped at store to quickly add store location to an item without retyping the store name and creating a duplicate store
