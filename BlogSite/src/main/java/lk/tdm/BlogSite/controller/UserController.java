package lk.tdm.BlogSite.controller;

import lk.tdm.BlogSite.dto.UserDTO;
import lk.tdm.BlogSite.service.UserService;
import lk.tdm.BlogSite.util.StandardResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {

    private static final Logger logger = LogManager.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping(path = "save-customer")
    public ResponseEntity<StandardResponse> saveUser(@RequestBody UserDTO userDTO) {

        String message = userService.saveUser(userDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"success",message), HttpStatus.CREATED
        );

    }

    @PutMapping(path = "update-customer")
    public ResponseEntity<StandardResponse> updateUser(@RequestBody UserDTO userDTO) {

        String message = userService.updateUser(userDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"success",message), HttpStatus.CREATED
        );

    }

    @GetMapping(path = "get-user-by-id/{id}")
    public ResponseEntity<StandardResponse> getUserById(@PathVariable int id) {

        UserDTO userDTO = userService.getUserById(id);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"success",userDTO), HttpStatus.CREATED
        );

    }

    @GetMapping(path = "get-all-users")
    public List<UserDTO> getAllUsers() {

        List<UserDTO> userDTOList = userService.getAllUsers();

        return userDTOList;

    }
}
