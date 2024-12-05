export interface ListItemData {
    id: number;
    isParent: number,
    text: string;
    routePath?:string | undefined; 
    icon?: React.ReactNode;
    children?: ListItemData[];
    action?: () => void | Promise<void>;
    allowedRoles?: any[];
  }


  