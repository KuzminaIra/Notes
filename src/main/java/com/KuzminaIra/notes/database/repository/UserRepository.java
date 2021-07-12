package com.KuzminaIra.notes.database.repository;

import com.KuzminaIra.notes.database.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
    User getByUsername(String username);
}
