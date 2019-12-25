import axios from "axios";

export default {
    state: {
        books: [],
        book: {}
    },
    getters: {
        books: state => {
            return state.books;
        },
        book: state => {
            return state.book;
        }
    },
    mutations: {
        setBooks: (state, payload) => {
            state.books = payload;
        },
        setBook: (state, payload) => {
            let book = state.books.filter(role => {
                return book.id == payload;
            });

            state.book = book;
        },
        addBooks: (state, payload) => {
            state.books.push(payload);
        }
    },
    actions: {
        getBooks: async (context, payload) => {
            try {
                let {
                    data
                } = await axios.get(`${process.env.VUE_APP_API}book`);
                context.commit("setBooks", data.data);
            } catch (error) {}

        }
    }
};