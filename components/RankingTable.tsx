import { FlashList } from "@shopify/flash-list";
import * as React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import { User } from "~/types/User";

const PLAYERS: User[] = [
  {
    id: "1",
    name: "Player 1",
    gamesPlayed: 10,
    moneyEarned: 400,
    moneySpent: 650,
  },
  {
    id: "2",
    name: "Player 2",
    gamesPlayed: 8,
    moneyEarned: 800,
    moneySpent: 300,
  },
  {
    id: "3",
    name: "Player 3",
    gamesPlayed: 5,
    moneyEarned: 500,
    moneySpent: 200,
  },
];

const MIN_COLUMN_WIDTHS = [50, 50, 40, 40];

function RankingTable() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

  return (
    <ScrollView
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <Table aria-labelledby="players-table">
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: columnWidths[0] }}>
              <Text className="text-center">Name</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[1] }}>
              <Text className="text-center">Games Played</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[2] }}>
              <Text className="text-center">Money Earned</Text>
            </TableHead>
            <TableHead style={{ width: columnWidths[3] }}>
              <Text className="text-center">Money Spent</Text>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <FlashList
            data={PLAYERS}
            estimatedItemSize={45}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: player, index }) => {
              return (
                <TableRow
                  key={player.id}
                  className={cn(
                    "active:bg-secondary",
                    index % 2 && "bg-muted/40 "
                  )}
                >
                  <TableCell style={{ width: columnWidths[0] }}>
                    <Text className="text-center">{player.name}</Text>
                  </TableCell>
                  <TableCell style={{ width: columnWidths[1] }}>
                    <Text className="text-center">{player.gamesPlayed}</Text>
                  </TableCell>
                  <TableCell style={{ width: columnWidths[2] }}>
                    <Text className="text-center">{player.moneyEarned}</Text>
                  </TableCell>
                  <TableCell style={{ width: columnWidths[3] }}>
                    <Text className="text-center">{player.moneySpent}</Text>
                  </TableCell>
                </TableRow>
              );
            }}
          />
        </TableBody>
      </Table>
    </ScrollView>
  );
}

export default RankingTable;
