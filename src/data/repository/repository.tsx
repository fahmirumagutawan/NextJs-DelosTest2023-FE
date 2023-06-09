import { ApiSource } from "../source/api/api_source";
import { LocalStorageSource } from "../source/localstorage/localstorage_source";
import { SupabaseSource } from "../source/supabase/supabase_source";

export class Repository {
    apiSource: ApiSource;
    localStorageSource: LocalStorageSource;
    supabaseSource: SupabaseSource

    constructor(apiSource: ApiSource, localStorageSource: LocalStorageSource, supabaseSource: SupabaseSource) {
        this.apiSource = apiSource
        this.localStorageSource = localStorageSource
        this.supabaseSource = supabaseSource
    }

    getLoginState = () => {
        return this.localStorageSource.getLoginState()
    }

    setLoginState = (isLoggedIn: string) => {
        this.localStorageSource.setLoginState(isLoggedIn)
    }

    getEmail = () => {
        return this.localStorageSource.getEmail()
    }

    setEmail = (email: string) => {
        this.localStorageSource.setEmail(email)
    }

    register = (email: string, password: string, name: string, onSuccess: () => void, onFailed: (message: string) => void) => {
        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        if (password.length == 0) {
            onFailed('Input the password')
            return
        }

        if (password.length < 8) {
            onFailed('Password must contains 8 letters or more')
            return
        }

        if (password.length > 20) {
            onFailed('Password must less than 20 letters')
            return
        }

        if (name.length == 0) {
            onFailed('Input your name')
            return
        }

        if (name.length > 30) {
            onFailed('Name too long, must less than 30 letters')
            return
        }
        return this.supabaseSource
            .register(
                email,
                password,
                name,
                onSuccess,
                onFailed)
    }

    login = (email: string, password: string, onSuccess: () => void, onFailed: (message: string) => void) => {
        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        if (password.length == 0) {
            onFailed('Input the password')
            return
        }

        if (password.length < 8) {
            onFailed('Password must contains 8 letters or more')
            return
        }

        return this.supabaseSource.login(
            email,
            password,
            onSuccess,
            onFailed
        )
    }

    getUserByEmail = (email: string, onSuccess: (data: { email: string; name: string; coin: string; }) => void, onFailed: (message: string) => void) => {
        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        return this.supabaseSource.getUserByEmail(email, onSuccess, onFailed)
    }

    getArticleByPage = (
        email: string,
        page: string | string[] | undefined,
        onSuccess: (data: Array<{ article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; total_page: number; abstract: string; owned: boolean }>) => void,
        onFailed: (message: string) => void
    ) => {
        let rawPage = (typeof (page) === 'undefined') ? '-1' : (page[0] || '')
        const intPage = parseInt(rawPage)

        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        if (!isNaN(intPage)) {
            if (intPage > 0) {
                return this.supabaseSource.getArticleByPage(email, intPage, onSuccess, onFailed)
            }
        } else {
            return this.supabaseSource.getArticleByPage(email, 1, onSuccess, onFailed)
        }
    }

    getArticleByPageAndQuery = (
        email: string,
        page: string | string[] | undefined,
        query: string | string[] | undefined,
        onSuccess: (data: Array<{ article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; total_page: number; abstract: string; owned: boolean }>) => void,
        onFailed: (message: string) => void
    ) => {
        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        let rawPage = (typeof (page) === 'undefined')
            ? '-1'
            : (typeof (page) === 'string') ? page : '1'
        let rawQuery = (typeof (query) === 'undefined')
            ? 'UNDEFINED'
            : (typeof (query) === 'string') ? query : ''
        const intPage = parseInt(rawPage)

        if (!isNaN(intPage)) {
            if (intPage > 0) {
                if (rawQuery !== 'UNDEFINED') {
                    return this.supabaseSource.getArticleByPageAndQuery(email, intPage, rawQuery, onSuccess, onFailed)
                }
            }
        } else {
            if (rawQuery !== 'UNDEFINED') {
                if (rawQuery.length !== 0) {
                    return this.supabaseSource.getArticleByPageAndQuery(email, 1, rawQuery, onSuccess, onFailed)
                }
            }
        }
    }

    getArticleById = (
        email: string,
        id: string | string[] | undefined,
        onSuccess: (data: { article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; abstract: string; date: string; owned: boolean }) => void,
        onFailed: (message: string) => void
    ) => {
        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        const rawId = (typeof (id) === 'undefined')
            ? 'UNDEFINED'
            : (typeof (id) !== 'string')
                ? 'UNDEFINED'
                : id

        this.supabaseSource.getArticleById(email, rawId, onSuccess, onFailed)
    }

    addArticleToCart = (
        email: string,
        id: string | string[] | undefined,
        onSuccess: () => void,
        onFailed: (message: string) => void
    ) => {
        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        const rawId = (typeof (id) === 'undefined')
            ? 'UNDEFINED'
            : (typeof (id) !== 'string')
                ? 'UNDEFINED'
                : id

        this.supabaseSource.addArticleToCart(email, rawId, onSuccess, onFailed)
    }

    getOwnedArticle = (
        email: string,
        onSuccess: (
            data: Array<{ article_id: string; image: string; title: string; article_value: string; modified_time_inmillis: number; author: string; abstract: string; owned: boolean }>
        ) => void,
        onFailed: (message: string) => void
    ) => {
        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        this.supabaseSource.getOwnedArticle(email, onSuccess, onFailed)
    }

    getLuckyDrawInfo = (
        email: string,
        onSuccess: (data: { uid: string, recent_coin_track: number, ticket: number }) => void,
        onFailed: (errorMessage: string) => void
    ) => {
        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        this.supabaseSource.getLuckyDrawInfo(email, onSuccess, onFailed)
    }

    decreaseTicketByOne = (
        email: string,
        onSuccess: () => void,
        onFailed: (errorMessage: string) => void
    ) => {
        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        this.supabaseSource.decreaseTicketByOne(email, onSuccess, onFailed)
    }

    luckyDraw = async (
        email: string,
        onSuccess: (successMessage: string) => void,
        onFailed: (errorMessage: string) => void
    ) => {
        if (email.length == 0) {
            onFailed('Input the email')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            onFailed('Input the correct email format')
            return
        }

        const luckyPrices = [50000, 20000, 0]
        const randomizedPrice = luckyPrices[Math.floor(Math.random() * luckyPrices.length)]

        await new Promise(resolve => setTimeout(resolve, 3000))
        this.supabaseSource.decreaseTicketByOne(
            email, 
            () => {
                this.supabaseSource.updateUserCoin(
                    email,
                    randomizedPrice,
                    () => {
                        if(randomizedPrice == 0){
                            onSuccess('Unfortunately you didn\'t get any coin :( Try again later budd')
                        }else{
                            onSuccess('Congratulation, you have got '+randomizedPrice+' Coin. It\'s been added to your account' )
                        }
                    },
                    onFailed
                )
            },
            onFailed
        )
    }
}