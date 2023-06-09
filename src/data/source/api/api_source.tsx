import { AppContext } from "@/context/app_context";
import { useContext } from "react";
import { GET_ARTICLES_BY_PAGE_URL, GET_USER_BY_UID_URL, LOGIN_URL, REGISTER_URL } from "./api_source_url";

export class ApiSource {
    login = async (email: string, password: string) => {
        const bodyData = {
            email: email,
            password: password
        }

        return await fetch(
            LOGIN_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            }
        )
    }

    register = async (email: string, password: string, name: string) => {
        const bodyData = {
            email: email,
            password: password,
            name: name
        }

        return await fetch(
            REGISTER_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            }
        )
    }

    getUserByUid = async (token: string) => {
        return await fetch(
            GET_USER_BY_UID_URL,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }
        )
    }

    getArticlesByPage = async (page: string | string[]) => {
        return await fetch(
            GET_ARTICLES_BY_PAGE_URL + "?page=" + page,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}