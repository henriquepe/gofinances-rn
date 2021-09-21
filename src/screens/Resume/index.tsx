import React, { useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { VictoryPie } from "victory-native";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from "./styles";
import { useEffect } from "react";
import { TransactionsProps } from "../Dashboard";
import { categories } from "../../utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, format, subMonths } from "date-fns";
import ptBR from "date-fns/locale/pt-BR/index.js";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

interface CategoryData {
  name: string;
  total: string;
  color: string;
  percentage: string;
  percentageFormatted: number;
}

export const Resume: React.FC = () => {
  const [totalByCategorys, setTotalByCategorys] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const bottomTabBarHeight = useBottomTabBarHeight();

  const theme = useTheme();

  const handleDateChange = (action: "next" | "prev") => {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const formatedResponse: TransactionsProps[] = response
      ? JSON.parse(response)
      : [];

    const expensives = formatedResponse.filter(
      (expensive) =>
        expensive.transactionType === "Outcome" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensives.reduce(
      (accumulator, expensive) => accumulator + Number(expensive.amount),
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if (expensive.category === category.value) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0)
        totalByCategory.push({
          name: category.label,
          color: category.label,
          percentageFormatted: Number(
            ((categorySum * 100) / expensiveTotal).toFixed(0)
          ),
          percentage: `${Number(
            ((categorySum * 100) / expensiveTotal).toFixed(0)
          )}%`,
          total: categorySum.toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
          }),
        });
    });

    setTotalByCategorys(totalByCategory);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useFocusEffect(() => {
    loadData();
  });

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={useTheme().colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          contentContainerStyle={{
            paddingBottom: bottomTabBarHeight,
            padding: 24,
            flex: 1,
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategorys}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              colorScale={totalByCategorys.map((category) => {
                switch (category.color) {
                  case "Alimentação":
                    return "#5835D6";
                  case "Casa":
                    return "#F88631";
                  case "Carro":
                    return "#EA3F60";
                  case "Vendas":
                    return "#33A357";

                  default:
                    return "blue";
                    break;
                }
              })}
              x="percentage"
              y="percentageFormatted"
            />
          </ChartContainer>

          {totalByCategorys?.map((category) => {
            return (
              <HistoryCard
                key={category.name}
                title={category.name}
                amount={category.total}
                color={category.color}
              />
            );
          })}
        </Content>
      )}
    </Container>
  );
};
