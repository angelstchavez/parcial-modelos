import { Inbox } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import upcLogo from "@/public/upc.png";
// Menu items.
const items = [
  {
    title: "Decreto 1279",
    url: "/decreto",
    icon: Inbox,
  },
  {
    title: "Acuerdo 006 de 2018",
    url: "/acuerdo",
    icon: Inbox,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700 text-lg">
            Modelos y simulación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="text-green-700" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className=" border-t">
        <Image
          className="mx-auto mb-2 mt-2"
          src={upcLogo}
          alt={"Logo Universidad Popular del Cesar"}
          priority
          width={120}
          height={120}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
