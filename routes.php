<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
//end
// Routes

$app->get('/customer', function ($request, $response, $args) {
    $sql = $this->db->prepare("SELECT * FROM customer"); 
    $sql->execute();
    $data = $sql->fetchAll(PDO::FETCH_ASSOC); // Fetch data as associative array
    return $response->withJson($data, 200); // Return data directly
});


$app->get('/coach', function ($request, $response, $args) {
    $sql = $this->db->prepare("SELECT * FROM coach"); 
    $sql->execute();
    $data = $sql->fetchAll(PDO::FETCH_ASSOC); // Fetch data as associative array
    return $response->withJson($data, 200); // Return data directly
});


$app->get('/coach/{coachId}', function ($request, $response, $args) {
    $coachId = $args['coachId'];
    // Prepare SQL query with a parameter for the coach ID
    $sql = $this->db->prepare("SELECT * FROM coach WHERE coachId = :coachId");
    // Bind the coach ID parameter
    $sql->bindParam(':coachId', $coachId);
    // Execute the query
    $sql->execute();
    // Fetch the coach data
    $coach = $sql->fetch();
    // Check if coach exists
    if (!$coach) {
        // Return a 404 Not Found response if coach does not exist
        return $response->withStatus(404)->withJson(['error' => 'coach not found']);
    }        
    // Return the coach data as JSON
    return $response->withHeader('Content-Type', 'application/json')
                    ->withHeader('Access-Control-Allow-Origin', '*')
                    ->withJson($coach);
});






$app->get('/customer/{custId}', function ($request, $response, $args) {
    $custId = $args['custId'];
    // Prepare SQL query with a parameter for the customer ID
    $sql = $this->db->prepare("SELECT * FROM customer WHERE custId = :custId");
    // Bind the customer ID parameter
    $sql->bindParam(':custId', $custId);
    // Execute the query
    $sql->execute();
    // Fetch the customer data
    $customer = $sql->fetch();
    // Check if customer exists
    if (!$customer) {
        // Return a 404 Not Found response if customer does not exist
        return $response->withStatus(404)->withJson(['error' => 'customer not found']);
    }        
    // Return the customer data as JSON
    return $response->withHeader('Content-Type', 'application/json')
                    ->withHeader('Access-Control-Allow-Origin', '*')
                    ->withJson($customer);
});



$app->post('/customer/add', function ($request, $response, $args) {
    // Get the request body data
    $input = $request->getParsedBody();

    // Retrieve the database connection from the container
    $db = $this->get('db');
    
    // Prepare the SQL query
    $sql = 'INSERT INTO customer (custName, custEmail, custPhone) VALUES (:custName, :custEmail, :custPhone)';
    $stmt = $db->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(':custName', $input['custName']);
    $stmt->bindParam(':custEmail', $input['custEmail']);
    $stmt->bindParam(':custPhone', $input['custPhone']);
    
    // Execute the query
    $stmt->execute();
    
    // Return success message
    return $response->withJson(['message' => 'customer added successfully'], 200);
});



$app->post('/coach/add', function ($request, $response, $args) {
    // Get the request body data
    $input = $request->getParsedBody();

    // Retrieve the database connection from the container
    $db = $this->get('db');
    
    // Prepare the SQL query
    $sql = 'INSERT INTO coach (coachName, coachPhone) VALUES (:coachName, :coachPhone)';
    $stmt = $db->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(':coachName', $input['coachName']);
    $stmt->bindParam(':coachPhone', $input['coachPhone']);
    
    // Execute the query
    $stmt->execute();
    
    // Return success message
    return $response->withJson(['message' => 'coach added successfully'], 200);
});









$app->delete('/customer/del/{id}', function ($request, $response, $args) {
    // Get the ID from the route parameters
    $custId = $args['id'];
    
    // Prepare the DELETE query
    $sql = $this->db->prepare("DELETE FROM customer WHERE custId = :custId");
    // Bind the parameter
    $sql->bindParam(':custId', $custId);
    
    // Execute the query
    $sql->execute();
    
    // Check if an rows were affected (if the customer with the given ID existed)
    if ($sql->rowCount() > 0) {
        // Return success message if the customer was deleted
        return $response->withJson(['message' => 'customer deleted successfully'], 200);
    } else {
        // Return error message if the customer with the given ID was not found
        return $response->withJson(['message' => 'customer not found'], 404);
    }
});


$app->delete('/coach/del/{coachId}', function ($request, $response, $args) {
    // Get the ID from the route parameters
    $coachId = $args['coachId'];
    
    // Prepare the DELETE query
    $sql = $this->db->prepare("DELETE FROM coach WHERE coachId = :coachId");
    // Bind the parameter
    $sql->bindParam(':coachId', $coachId);
    
    // Execute the query
    $sql->execute();
    
    // Check if an rows were affected (if the coach with the given ID existed)
    if ($sql->rowCount() > 0) {
        // Return success message if the coach was deleted
        return $response->withJson(['message' => 'coach deleted successfully'], 200);
    } else {
        // Return error message if the coach with the given ID was not found
        return $response->withJson(['message' => 'coach not found'], 404);
    }
});



$app->put('/customer/update/{custId}', function (Request $request, Response $response, array $args) {
    $input = $request->getParsedBody();
    $db = $this->get('db'); // Retrieve the database connection from the container
    
    
    // Prepare the SQL query
    $sql = 'UPDATE customer SET custName = :custName, custEmail = :custEmail, custPhone = :custPhone WHERE custId = :custId';
    $stmt = $db->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(':custName', $input['custName']);
    $stmt->bindParam(':custEmail', $input['custEmail']);
    $stmt->bindParam(':custPhone', $input['custPhone']);
    $stmt->bindParam(':custId', $args['custId']);
    
    // Execute the query
    $stmt->execute();
    
    // Return success message
    return $response->withJson(['message' => 'customers updated successfully']);
});




$app->put('/coach/update/{coachId}', function (Request $request, Response $response, array $args) {
    $input = $request->getParsedBody();
    $db = $this->get('db'); // Retrieve the database connection from the container
    
    
    // Prepare the SQL query
    $sql = 'UPDATE coach SET coachName = :coachName, coachPhone = :coachPhone WHERE coachId = :coachId';
    $stmt = $db->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(':coachName', $input['coachName']);
    $stmt->bindParam(':coachPhone', $input['coachPhone']);
    $stmt->bindParam(':coachId', $args['coachId']);
    
    // Execute the query
    $stmt->execute();
    
    // Return success message
    return $response->withJson(['message' => 'coachs updated successfully']);
});
