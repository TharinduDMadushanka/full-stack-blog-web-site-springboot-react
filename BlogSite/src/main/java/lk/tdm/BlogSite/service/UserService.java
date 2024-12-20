package lk.tdm.BlogSite.service;

import lk.tdm.BlogSite.dto.UserDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    String saveUser(UserDTO userDTO);
}
