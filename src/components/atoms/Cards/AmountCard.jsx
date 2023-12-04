import { View, Text } from "react-native";
const AmountCard = ({ amount, descripion, style }) => {
  return (
    <View style={[CardStyle.container, style || {}]}>
      <Text style={CardStyle.amount}>{amount}</Text>
      <Text style={CardStyle.description}>{descripion}</Text>
    </View>
  );
};

const CardStyle = StyleSheet.create({
  container: {
    flex: 0.1,
    gap: 5,
    padding: 5,
    margin: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  amount: {
    fontSize: 35,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  description: {
    flexWrap: "wrap",
    fontWeight: "400",
    fontSize: 15,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export default AmountCard;
