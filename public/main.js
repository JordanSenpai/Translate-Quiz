angular.module('translateApp', []);

angular.module('translateApp')
    .controller('translateController', ['$scope', '$http', function($scope, $http){
       
 
var wrongCount  = 0 
var charCounter = 0
$scope.submit   = function () {


$http.post('/submit', $scope.translate)
    .then(function(returnData) {
        $scope.translatedWord = returnData.data
    })

}
    
// I freak out when all the plus symbols do not line up.

$scope.wordsToTranslate = ['cat', 'dog', 'bear', 'crab', 'bunny', 'cow', 'deer', 'duck', 'hedgehog', 'fox']
$scope.spanishAnswers   = ['gato', 'perro', 'oso', 'cangrejo', 'conejito', 'vaca', 'venado', 'pato', 'erizo', 'zorro']
$scope.answer           = []
$scope.answersSubmit    = function(index) {


    var submissionobj   = { startlang: 'en',
                            endlang: $scope.langSelect,
                            word: $scope.wordsToTranslate[index]
                        }

    $http.post('/checkanswer', submissionobj)
    .then(function(returnData) { 

        for (var i = 0; i < returnData.data.length; i++) {
            if(returnData.data[i] != $scope.answer[index][i]) {
                charCounter++
                console.log(charCounter)
            }

        }


        if($scope.answer[index] == returnData.data) {
            alert('Awesome. You got it!')
            console.log('correct')
        } 
        else if (charCounter == 1) {
            alert('Ooh so close. The correct word was ' + returnData.data)
        } 
        else {
            console.log('Wrong')
            alert('Sorry, that is not right. The right answer was ' + returnData.data)
            wrongCount++
            if (wrongCount === 3) {
                alert('Better luck next time.')
                window.location.reload()
            }
        }
    })

    charCounter = 0

    }          
}])

