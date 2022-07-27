import { Fruit } from "@type/fruit";

export namespace Core {

  export interface state {
    items: Fruit[],
    isLoading: boolean,
    notification: notification
  }

  export interface notification {
    message: string | null,
    type: string | undefined
  }
}


export const initialCoreState: Core.state = {
  items: [],
  isLoading: false,
  notification: {
    message: null,
    type: undefined
  }
}