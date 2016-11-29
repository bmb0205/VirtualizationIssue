
export class FilterValueConverter {
    toView(array, propOne) {
        if (propOne) {
            return array.filter(todo => {
                return todo[propOne] === false;
            });
        } else {
            return array;
        }
    }
}

export class FilterTwoValueConverter {
    toView(array, propTwo) {
        if (propTwo) {
            return array.filter(todo => {
                return todo[propTwo] === 'fugiat veniam minus';
            });
        } else {
            return array;
        }
    }
}

export class FilterThreeValueConverter {
    toView(array, propThree) {
        if (propThree) {
            return array.filter(todo => {
                return todo[propThree] === 2;
            });
        } else {
            return array;
        }
    }
}