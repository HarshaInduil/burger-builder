import React, { Component } from 'react';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 25,
    bacon: 60,
    cheese: 40,
    meat: 100
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 50,
        purchasable: false,
        purchasing: false
    }

    updatePurchaceState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key]
            })
            .reduce((sum,element) =>{
                return sum + element;
            },0)

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaceState(updatedIngredients);
    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updateCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaceState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false});
    }

    purchaceContinueHandler = () => {
        alert("Continue");
    }

    render () {

        const diableInfo = {
            ...this.state.ingredients
        }

        for (let key in diableInfo){
            diableInfo[key] = diableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchangeContinue = {this.purchaceContinueHandler}
                        purchanceCancel = {this.purchaseCancelHandler}
                        price = {this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientsAdd = {this.addIngredientHandler}
                    ingredientsRemove = {this.removeIngredientHandler}
                    disabled = {diableInfo}
                    totalPrice = {this.state.totalPrice}
                    purchasable = {!this.state.purchasable}
                    purchasing = {this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;