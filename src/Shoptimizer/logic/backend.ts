import ApiResponse from "../models/ApiResponse";
import axios, { AxiosResponse } from 'axios';
import { SearchProduct } from "../models/Product";
import { ShoppingList, ShoppingListPostDto, ShoppingListPreview } from "../models/ShoppingList";
import { ShoppingItem, ShoppingItemPostDto } from "../models/ShoppingItem";

export abstract class Backend {
  static readonly localHost = "https://localhost:44357/";
  static readonly remoteHost = "https://shoptimizer-api.azurewebsites.net/";
  
  static readonly apiClient = axios.create({
    baseURL: Backend.remoteHost,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Search
  private static readonly searchProductsUrl = "Search/SearchProducts";

  // ShoppingList
  private static readonly getShoppingListWithShoppingItemsUrl = "ShoppingList/{id}/GetWithShoppingItems"
  private static readonly createShoppingListUrl = "ShoppingList/Create"
  private static readonly archiveShoppingListUrl = "ShoppingList/{id}/Archive";
  private static readonly deleteShoppingListUrl = "ShoppingList/{id}/Delete";

  // ShoppingListPreview
  private static readonly getShoppingListPreviewsForUserUrl = "ShoppingList/Preview/GetAllForUser/{userId}";

  // ShoppingItem
  private static readonly createShoppingItemUrl = "ShoppingItem/Create";
  private static readonly updateShoppingItemCountUrl = "ShoppingItem/{id}/UpdateCount/{count}";
  private static readonly deleteShoppingItemUrl = "ShoppingItem/{id}/Delete";

  public static async searchProducts(phrase: string, signal?: AbortSignal): Promise<ApiResponse<SearchProduct[]>> {
    const res: AxiosResponse<SearchProduct[]> = await Backend.apiClient.get<SearchProduct[]>(
      Backend.searchProductsUrl, {
        params: { phrase },
        signal: signal,
      }
    );

    return handleApiResponse<SearchProduct[]>(res);
  }

  
  public static async getShoppingListWithShoppingItems(id: number, signal?: AbortSignal): Promise<ApiResponse<ShoppingList>> {
    const res: AxiosResponse<ShoppingList> = await Backend.apiClient.get(
      compileUrl(Backend.getShoppingListWithShoppingItemsUrl, { id }), {
        signal: signal,
      }
    );
    
    return handleApiResponse(res);
  }
  public static async createShoppingList(shoppingList: ShoppingListPostDto, signal?: AbortSignal): Promise<ApiResponse<ShoppingList>> {
    const res: AxiosResponse<ShoppingList, ShoppingListPostDto> = await Backend.apiClient.post<
      ShoppingList,
      AxiosResponse<ShoppingList, ShoppingListPostDto>,
      ShoppingListPostDto
    >(
      Backend.createShoppingListUrl,
      shoppingList, {
        signal: signal,
      }
    );

    return handleApiResponse(res);
  }
  public static async archiveShoppingList(id: number, signal?: AbortSignal): Promise<ApiResponse<void>> {
    const res: AxiosResponse<void, any> = await Backend.apiClient.put<void>(
      compileUrl(Backend.archiveShoppingListUrl, { id }), null, {
        signal: signal,
      }
    );

    return handleApiResponse(res);
  }
  static async deleteShoppingList(id: number, signal?: AbortSignal): Promise<ApiResponse<void>> {
    const res: AxiosResponse<void, any> = await Backend.apiClient.delete<void>(
      compileUrl(Backend.deleteShoppingListUrl, { id }), {
        signal: signal,
      }
    );

    return handleApiResponse(res);
  }

  public static async createShoppingItem(shoppingItem: ShoppingItemPostDto, signal?: AbortSignal): Promise<ApiResponse<ShoppingItem>> {
    const res: AxiosResponse<ShoppingItem, ShoppingItemPostDto> = await Backend.apiClient.post<
      ShoppingItem,
      AxiosResponse<ShoppingItem, ShoppingItemPostDto>,
      ShoppingItemPostDto
    >(
      Backend.createShoppingItemUrl,
      shoppingItem, {
        signal: signal,
      }
    );

    return handleApiResponse(res);
  }
  public static async updateShoppingItemCount(id: number, count: number, signal?: AbortSignal): Promise<ApiResponse<void>> {
    const res: AxiosResponse<void, any> = await Backend.apiClient.put<void>(
      compileUrl(Backend.updateShoppingItemCountUrl, { id, count }), null, {
        signal: signal,
      }
    );

    return handleApiResponse(res);
  }
  public static async deleteShoppingItem(id: number, signal?: AbortSignal): Promise<ApiResponse<void>> {
    const res: AxiosResponse<void, any> = await Backend.apiClient.delete<void>(
      compileUrl(Backend.deleteShoppingItemUrl, { id }), {
        signal: signal,
      }
    );

    return handleApiResponse(res);
  }

  public static async getShoppingListPreviewsForUser(userId: number, signal?: AbortSignal): Promise<ApiResponse<ShoppingListPreview[]>> {
    const res: AxiosResponse<ShoppingListPreview[], any> = await Backend.apiClient.get<ShoppingListPreview[]>(
      compileUrl(Backend.getShoppingListPreviewsForUserUrl, { userId }), {
        signal: signal,
      }
    );

    return handleApiResponse(res);
  }
}

function handleApiResponse<T, D = T>(res: AxiosResponse<T, D>): ApiResponse<T> {
  return {
    request: res.request,
    success: res.status / 100 < 3,
    statusCode: res.status,
    message: res.statusText,
    data: res.data,
  } as ApiResponse<T>;
}

function compileUrl(url: string, params: object) {
  let compiledUrl: string = url;
  for (let [key, value] of Object.entries(params)) {
    compiledUrl = compiledUrl.replace(`{${key}}`, String(value));
  }
  return compiledUrl;
}