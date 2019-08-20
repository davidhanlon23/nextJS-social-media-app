/* eslint-disable linebreak-style */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";
import withStyles from "@material-ui/core/styles/withStyles";
import { Divider } from "@material-ui/core";
import { signupUser } from "../lib/auth";
import Link from "next/link";

function Transition( props ){
	return <Slide direction="up" {...props} />;
}

// eslint-disable-next-line no-undef
class Signup extends React.Component {
  state = {
  	name:"",
  	email:"",
  	password:"",
  	error:"",
  	openError:false,
  	createdUser:"",
  	openSuccess:false,
  	isLoading: false
  };
  handleClose = ()=> {this.setState( { openError:false } );};

  handleChange =event=>{
  	this.setState( { [event.target.name]: event.target.value } );
  };
  handleSubmit = event =>{
  	const { name, email, password }=this.state;
  	event.preventDefault();
  	const user = {
  		name,
  		email,
  		password
  	};
  	this.setState( { isLoading:true, error:"" } );
  	signupUser( user ).then( createdUser =>{
  		this.setState( { 
  			createdUser,
  			error:"",
  			openSuccess:true,
  			isLoading:false
  		} );
  	} ).catch( this.showError );

  };

  showError= err =>{
  	const error = err.response && err.response.data || err.message;
  	this.setState( { error, openError:true, isLoading:false } );

  }
  render() {
  	const { classes } = this.props;
  	const{ error, openError, openSuccess, createdUser, isLoading } = this.state;
  	return (
  		<div className={classes.root}>
  			<Paper className={classes.paper}>
  				<Avatar className={classes.avatar}>
  					<Gavel/>
  				</Avatar>

  				<Typography variant="h5" component="h1">
              Sign Up
  				</Typography>

  				<form onSubmit={this.handleSubmit}className ={classes.form} action="">
  					<FormControl margin="normal" required fullWidth>
  						<InputLabel>Name</InputLabel>
  						<Input
  							name="name"
  							type="text"
  							onChange={this.handleChange}
  						/>
  					</FormControl>
  					<FormControl margin="normal" required fullWidth>
  						<InputLabel>Email</InputLabel>
  						<Input
  							name="email"
  							type="email"
  							onChange={this.handleChange}
  						/>
  					</FormControl>
  					<FormControl margin="normal" required fullWidth>
  						<InputLabel>Password</InputLabel>
  						<Input
  							name="password"
  							type="password"
  							onChange={this.handleChange}
  						/>
  					</FormControl>

  					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={isLoading}> {isLoading ? "Signing up...":"Sign Up"}</Button>
            
  				</form>

  				{/*Error Snackbar */}
          
  			{ error &&	<Snackbar 
  					anchorOrigin={{
  						vertical: "bottom",
  						horizontal:"right"
  					}}
  					open={openError}
  					onClose={this.handleClose}
  					autoHideDuration={6000}
  					message ={<span className={classes.snack}>{error}</span>}
  				/>}
  			</Paper>

  			{/*Success Dialog */}
  			<Dialog
  				open={openSuccess}
  				disableBackdropClick={true}
  				TransitionComponent={Transition}
  			>
  				<DialogTitle>
  					<VerifiedUserTwoTone className={classes.icon}/>
             New Account
  				</DialogTitle>
  			
        	<DialogContent>
  					<DialogContentText>
            User {createdUser} successfully created!
  					</DialogContentText>
  				</DialogContent>

  				<DialogActions>
  					<Button color="primary" variant="contained">
  						<Link href='signin'>
  							<a className={classes.signinLink}>Sign In</a>
  						</Link>
  					</Button>
  				</DialogActions>
  			</Dialog>
  		</div>
    
  	);
  }
}

const styles = theme => ( {
	root: {
		width: "auto",
		display: "block",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up( "md" )]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing.unit * 2
	},
	signinLink: {
		textDecoration: "none",
		color: "white"
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%",
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 2
	},
	snack: {
		color: theme.palette.secondary.light
	},
	icon: {
		padding: "0px 2px 2px 0px",
		verticalAlign: "middle",
		color: "green"
	}
} );

export default withStyles( styles )( Signup );
