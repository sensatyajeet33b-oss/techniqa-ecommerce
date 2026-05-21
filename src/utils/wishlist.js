// src/utils/wishlist.js

const WISHLIST_KEY = "wishlist";

/* GET */
export const getWishlist = () => {
    try {
        return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    } catch {
        return [];
    }
};

/* SAVE */
export const saveWishlist = (items) => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
};

/* TOGGLE */
export const toggleWishlistItem = (product) => {
    const wishlist = getWishlist();

    const exists = wishlist.find((item) => item.id === product.id);

    let updated;

    if (exists) {
        updated = wishlist.filter((item) => item.id !== product.id);
    } else {
        updated = [...wishlist, product];
    }

    saveWishlist(updated);

    return updated;
};

/* CHECK */
export const isInWishlist = (id) => {
    const wishlist = getWishlist();
    return wishlist.some((item) => item.id === id);
};