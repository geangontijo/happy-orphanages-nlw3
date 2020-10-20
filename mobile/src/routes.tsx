import React, { ReactComponentElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";
import OrphanagesData from "./pages/CreateOrphanage/OrphanageData";
import Header from "./components/Header";

interface route {
  name: string;
  component: ReactComponentElement;
  header?: Boolean;
  headerTitle?: String;
  showCancel?: Boolean;
}

const routes: route[] = [
  {
    name: "OrphanagesMap",
    component: OrphanagesMap,
  },
  {
    name: "OrphanageDetails",
    component: OrphanageDetails,
    header: true,
    headerTitle: "Orfanáto",
  },
  {
    name: "SelectMapPosition",
    component: SelectMapPosition,
    header: true,
    headerTitle: "Selecione no mapa",
    showCancel: true,
  },
  {
    name: "OrphanageData",
    component: OrphanagesData,
    header: true,
    headerTitle: "Informe os dados",
  },
];

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#f2f3f5" },
        }}
      >
        {routes.map((route, i) => (
          <Screen
            name={route.name}
            component={route.component}
            key={i}
            options={{
              headerShown: route.header !== undefined,
              header: () => (
                <Header
                  title={route.headerTitle}
                  showCancel={route.showCancel === undefined}
                />
              ),
            }}
          />
        ))}
      </Navigator>
    </NavigationContainer>
  );
}
