import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@fenchem-lp/ui";

export const IngredientCard = () => (
  <Card style={{ maxWidth: 380 }}>
    <CardHeader>
      <CardTitle>ChondroActive™</CardTitle>
      <CardDescription>Joint health · Nutrition division</CardDescription>
    </CardHeader>
    <CardContent>
      Clinically studied collagen peptide supporting mobility and cartilage health, supplied at
      industrial scale to formulators in 40+ countries.
    </CardContent>
    <CardFooter>
      <Button size="sm">Request specification</Button>
    </CardFooter>
  </Card>
);

export const WithAction = () => (
  <Card style={{ maxWidth: 380 }}>
    <CardHeader>
      <CardTitle>Lutein 20% Beadlet</CardTitle>
      <CardDescription>Eye health · stable formulation</CardDescription>
      <CardAction>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      Marigold-derived lutein esters, microencapsulated for tablet and capsule applications.
    </CardContent>
  </Card>
);
