import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from "@mui/material/TextField";
import { object, string } from "yup";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";

const Login = () => {
  const { currentUser, error, loading } = useSelector((state) => state?.auth);
  const {login}= useAuthCall()
  const loginSchema = object({
    email: string()
      .email("Lutfen dogru bir email giriniz.")
      .required("Bu alan zorunludur."),
    password: string()
      .required("Password zorunludur")
      .min(8, "Minumum 8 karakter olmalidir.")
      .max(16, "maximum 16 karakter olmalidir.")
      .matches(/\d+/, "Password en az bir sayi icermelidir.")
      .matches(/[a-z]/, "Password en az bir kucuk harf icermelidir.")
      .matches(/[A-Z]/, "Password en az bir buyuk harf icermelidir.")
      .matches(
        /[!,?{}<>%&$#@^_*+-]/,
        "Password en az bir özel karakter içermelidir."
      ),
  });

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values)
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <TextField
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    variant="outlined"
                    error={touched?.email && Boolean(errors?.email)}
                    helperText={touched?.email && errors?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.email || ""}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    error={touched?.password && Boolean(errors?.password)}
                    helperText={touched?.password && errors?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <LoadingButton variant="contained" type="submit" loading={loading} disabled={isSubmitting}>
                    Submit
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
