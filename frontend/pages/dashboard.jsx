import { Grid } from "@mui/material";
import BlogCard from "../src/components/dashboard/BlogCard";
import SalesOverview from "../src/components/dashboard/SalseOverview";
import DailyActivity from "../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../src/components/dashboard/ProductPerfomance";
import { AuthData } from "../src/components/Authentication/Auth";
import Home from "../src/components/dashboard/Home"
import Fab from '@mui/material/Fab';
import { PencilIcon } from "@heroicons/react/solid"

export default function Index() {
  const auth = AuthData()
  return (
    auth.authToken? 
    <>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductPerfomance />
      </Grid>
      <Grid item xs={12} lg={12}>
        <BlogCard />
      </Grid>
    </Grid>
    <Fab color="primary" aria-label="edit" sx={{position: 'fixed', bottom: 16, right: 16}}>
        <PencilIcon height={20} width={20}/>
    </Fab>
    </>
    :
    <Home />
  );
}
