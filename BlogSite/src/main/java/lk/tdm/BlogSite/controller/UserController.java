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

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {

    private static final Logger logger = LogManager.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<StandardResponse> saveUser(@RequestBody UserDTO userDTO) {

        String message = userService.saveUser(userDTO);

        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"success",message), HttpStatus.CREATED
        );

    }
}
