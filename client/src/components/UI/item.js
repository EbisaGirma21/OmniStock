import { Card, Container, Typography } from "@mui/material";

export default function Item(props) {
  return (
    <Container>
      <Card className="border-2  p-3 h-80 mt-10">
        <img src={props.item.name} alt="" className="w-full h-64" />
        <Typography className="mt-2 text-center">
          {props.item.description}
        </Typography>
      </Card>
    </Container>
  );
}
