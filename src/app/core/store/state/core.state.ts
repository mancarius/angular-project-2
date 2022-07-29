import { Fruit } from "@type/fruit";

export namespace Core {

  export interface state {
    isLoading: boolean,
    notification: notification
  }

  export interface notification {
    message: string | null,
    type: string | undefined
  }
}


export const initialCoreState: Core.state = {
  isLoading: false,
  notification: {
    message: null,
    type: undefined
  }
}