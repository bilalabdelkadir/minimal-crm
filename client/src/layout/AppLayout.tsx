import { AppShell, Burger, Button, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { IconBuildingWarehouse, IconDashboard } from "@tabler/icons-react";
import { ROUTES } from "@/router/constant";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const data = [
  { link: ROUTES.APP, label: "Dashboard", icon: IconDashboard },
  { link: ROUTES.COMPANY, label: "Company", icon: IconBuildingWarehouse },
];

const AppLayout = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  const selectedWorkspace = useSelector(
    (state: RootState) => state.workspaceInfo.selectedWorkspace?.id,
  );

  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedWorkspace) {
      navigate(ROUTES.WORKSPACE);
    }
  }, [selectedWorkspace]);

  const [active, setActive] = useState<"Dashboard" | "Company">("Dashboard");
  return (
    <>
      <AppShell
        padding="md"
        // header={{ height: 60 }}
        navbar={{
          width: 250,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
      >
        {/* <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <h3>Easy Crm App</h3>
          </Group>
        </AppShell.Header> */}
        <AppShell.Navbar
          p={15}
          className="
        bg-gray-100"
        >
          Navbar
          {data?.map((data) => (
            <div
              key={data.label}
              className="w-full 
            "
            >
              <Button
                fullWidth
                size="sm"
                variant={active === data.label ? "light" : "transparent"}
                leftSection={
                  <data.icon size={22} stroke={1.2} className="text-sm" />
                }
                className="text-sm font-medium text-gray-900 hover:bg-gray-200"
                justify="start"
                onClick={(e) => {
                  e.preventDefault();
                  setActive(data.label as any);
                  navigate(data.link);
                }}
              >
                {data.label}
              </Button>
            </div>
          ))}
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default AppLayout;
